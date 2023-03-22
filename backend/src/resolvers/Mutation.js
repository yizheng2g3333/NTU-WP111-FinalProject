import bcrypt, { compareSync, hash } from 'bcrypt';
import { UserModel } from '../models/userModel';
import { ReportModel } from '../models/reportModel'
const jwt = require("jsonwebtoken");
import { Directions, Optimization } from './api_caller/OpenRouterService';

////////////////////////// User Function  //////////////////////////
// Register Function
const registerUser = async (name, email, password, UserModel) => {
    let userFind = await UserModel.findOne({
        Email: email,
    });
    if (!userFind) {
        let hashedPassword = await bcrypt.hash(password, 10);
        userFind = await new UserModel({
            Name: name,
            Email: email,
            Password: hashedPassword,
            Favourites: [],
            Filter: { "nature": 50, "art": 50, "eat": 50, "spa": 50, "play": 50, "sport": 50 },
        }).save();
        return userFind;
    }

    return null; // return null if already registered

}

// Login Function
const loginUser = async (email, password, UserModel) => {
    let user = await UserModel.findOne({
        Email: email,
    })

    if (!user) {
        throw new Error('Email not found');
    }

    const validPassword = await bcrypt.compare(password, user.Password);

    if (!validPassword) {
        throw new Error('Password is incorrect');
    } else {
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.Email,
            },
            "secret",
            { expiresIn: "1h" }
        );
        user.Token = token
        // await user.update({ Email: email }, { Token: token });
        user.save();
        console.log(user)
    }
    return user;
}

// AuthToken Function
const authoToken = async (email, token, UserModel) => {
    const user = await UserModel.findOne({
        Email: email,
        Token: token,
    })

    if (!user) {
        return null
    }
    else {
        return user;
    }

}

// Change Password
const changePassword = async (email, currentPassword, passwordToChange, UserModel) => {
    let user = await UserModel.findOne({
        Email: email,
    });

    const validPassword = await bcrypt.compare(currentPassword, user.Password);

    if (!validPassword) {
        throw new Error('Password is incorrect');

    } else {

        const hashedPassword = await bcrypt.hash(passwordToChange, 10);
        user.Password = hashedPassword;
        await user.save();

    }

    return user;

}

// "find if spot already in" function
const findFav = (someUser, spotName) => {
    return someUser.Favourites.filter((aSpot) => {
        return aSpot.Name === spotName;
    })
}

// "remove spot" function
const removeFav = (someUser, spotName) => {
    return someUser.Favourites.filter((aSpot) => {
        return aSpot.Name !== spotName;
    })
}

// Add favourite function, name = name of spot
const addFavourite = async (email, name, SpotModel, UserModel) => {

    const spot = await SpotModel.findOne({
        Name: { $regex: name }
    });

    let user = await UserModel.findOne({
        Email: email,
    });

    if ((!spot) || (!user)) {
        return
    }

    let userFav = user.Favourites;

    if (!userFav[0]) { // Favourites is empty

        await user.Favourites.push(spot);
        await user.save();

    } else if (!findFav(user, name)[0]) { // not in list
        await user.Favourites.push(spot);
        await user.save();
    }

    return user;

}

// Delete favourite function,  name = name of spot
const delFavourite = async (email, name, SpotModel, UserModel) => {
    const spot = await SpotModel.findOne({
        // Name: { $regex: name }
        Name: name
    });

    let user = await UserModel.findOne({
        Email: email,
    });

    let userFav = user.Favourites;

    if (!userFav[0]) { // list is empty

    } else if (!findFav(user, name)[0]) { // not in list

    } else {

        user.Favourites = await removeFav(user, name);
        await user.save()
    }
    return user;
}


////////////////////////// User Function Ends //////////////////////////

////////////////////////// Report Function ///////////////////////////////

const feedbackReport = async (email, report, time) => {
    const feedback = await new ReportModel({
        Email: email,
        Report: report,
        Time: time,
    }).save()

    return feedback;

}


////////////////////////// Report Function Ends ///////////////////////////////


////////////////////////// Algo Function ///////////////////////////////

const sum = (a, b) => a + b

const dur_zscore = (arr) => {
    // console.log(arr)
    const Id = []
    arr.map((item) => {
        Id.push(item.id)
    })
    const arr1 = []
    arr.map((item) => {
        arr1.push(item.during)
    })

    const average = arr1.reduce((a, b) => a + b, 0) / arr1.length;
    // console.log(average)
    const stdDev = Math.sqrt(arr1.map(n => (n - average) * (n - average)).reduce(sum) / arr1.length)
    const arr_zscore = []
    arr1.map((item, index) => {
        arr_zscore.push({ Id: Id[index], during: 0 - ((item - average) / stdDev) }) //直接正負號相反，可能還可以再討論?
    })
    // console.log(arr)
    // console.log(arr_zscore)
    return arr_zscore
}

const makeName = (name, to) => { return [name, to].sort().join('_'); };

const love_score = async (data, Spot, box) => {
    // console.log(data)
    const arr1 = [data.a1, data.a2, data.a3, data.a4, data.a5, data.a6]
    const average = arr1.reduce((a, b) => a + b, 0) / arr1.length;
    let stdDev = Math.sqrt(arr1.map(n => (n - average) * (n - average)).reduce(sum) / arr1.length)
    if (stdDev == 0) {
        stdDev = 0.35
    }
    const arr_zscore = []
    const cate = ["自然", "文藝", '小吃', "溫泉", "遊憩", "體育", "其他"]
    arr1.map((item, index) => {
        arr_zscore.push({ cate: cate[index], love: ((item - average) / stdDev) })
    })
    arr_zscore.push({ cate: "其他", love: 0.5 }) //先設成0.5，要調再說
    let spot = await Spot.find({});
    let new_score_arr = []
    spot.map((item) => {
        let score = 0
        cate.map((cat, index) => {
            // console.log(arr_zscore[index]["love"])
            cat == item.class_result[0].first ? score += arr_zscore[index]["love"] : score += 0;
            cat == item.class_result[0].second ? score += arr_zscore[index]["love"] : score += 0;
            cat == item.class_result[0].third ? score += arr_zscore[index]["love"] : score += 0;
            // console.log(item.class_result[0].first)  
        })
        new_score_arr.push({ Id: makeName(item.Id, box["Id"]), score: score })
    })
    return new_score_arr
}

const Id_to_Name = async (position, arr, Spot) => {
    let box = await Spot.find({})
    let set1 = new Set
    set1.add(position)
    box.map((item) => {
        arr.map((item1) => {
            if (item1.Id.indexOf(item.Id) != -1) {
                set1.add(item.Name)
            }
        })
    })
    return [...set1]
}

const addfinal = async (arr) => {
    arr.push(arr[0])
    return arr
}

const during_sort = (arr) => {
    const arr1 = arr.sort(function (a, b) {
        return a.during > b.during ? -1 : 1 //排序
    });
    return arr1
}

const love_sort = (arr) => {
    const arr1 = arr.sort(function (a, b) {
        return a.love > b.love ? -1 : 1 //排序
    });
    return arr1
}

const process_time = async (position, time, travel, Spot) => {
    const total_set = []
    let tra_set = []
    if (time == "short") {
        const short_travel = travel.slice(0, 4) //取前四名
        let med_during = during_sort(short_travel)
        med_during = med_during.slice(0, 3)
        let med_love = love_sort(short_travel)
        med_love = med_love.slice(0, 3)

        let sho_during = med_during.slice(0, 2)
        let sho_love = med_love.slice(0, 2)

        tra_set = [short_travel, med_during, med_love, sho_during, sho_love]
    }
    else if (time == "middle") {
        const middle_travel = travel.slice(0, 6) //取前六名
        let med_during = during_sort(middle_travel)
        med_during = med_during.slice(0, 4)
        let med_love = love_sort(middle_travel)
        med_love = med_love.slice(0, 4)
        let sho_during = med_during.slice(0, 3)
        let sho_love = med_love.slice(0, 3)

        tra_set = [middle_travel, med_during, med_love, sho_during, sho_love]
    }
    else if (time == "middle_long") {
        const middle_long_travel = travel.slice(0, 8) //取前八名
        let med_during = during_sort(middle_long_travel)
        med_during = med_during.slice(0, 6)
        let med_love = love_sort(middle_long_travel)
        med_love = med_love.slice(0, 6)
        let sho_during = med_during.slice(0, 5)
        let sho_love = med_love.slice(0, 5)

        tra_set = [middle_long_travel, med_during, med_love, sho_during, sho_love]
    }
    else {
        const long_travel = travel.slice(0, 10) //取前十名
        let med_during = during_sort(long_travel)
        med_during = med_during.slice(0, 8)
        let med_love = love_sort(long_travel)
        med_love = med_love.slice(0, 8)
        let sho_during = med_during.slice(0, 6)
        let sho_love = med_love.slice(0, 6)

        tra_set = [long_travel, med_during, med_love, sho_during, sho_love]
    }
    for (var j = 0; j < tra_set.length; j++) {
        total_set.push(await Id_to_Name(position, tra_set[j], Spot))
    }

    let box = await Spot.find({})
    const final_set = [[], [], [], [], []]
    const new_set = []
    for (var i = 0; i < total_set.length; i++) {
        // new_set.push(await addfinal(total_set[i]))
        new_set.push(total_set[i])
        new_set[i].map((item1) => {
            box.map((item) => {
                if (item1 == item.Name) {
                    final_set[i].push(item)
                }
            })
        })
    }
    return final_set
}

const change_init = async (data) => {
    await UserModel.updateOne({ Email: data.Email }, {
        $set: { Filter: [{ nature: data.a1, art: data.a2, eat: data.a3, spa: data.a4, play: data.a5, sport: data.a6 }] }
    })
}

////////////////////////// Algo Function Ends ///////////////////////////////

const Mutation = {
    travel: async (parent, { data }, { Spot, During, Distance }) => {
        change_init(data)
        const position = data.position;
        let box = await Spot.findOne({ Name: position })
        let box_new = await Distance.find({ Id: { $regex: box["Id"] } }); //換成距離的話在這裡
        const each_dis_from_now = []
        box_new.map((item) => {
            // console.log(item)
            const a = { id: item.Id, during: parseFloat(item.distance) } //換成距離的話在這裡
            each_dis_from_now.push(a)
        })
        let dur_zcore_arr = await dur_zscore(each_dis_from_now)
        let love_zscore_arr = await love_score(data, Spot, box)

        let final = []
        dur_zcore_arr.map((item) => {
            love_zscore_arr.map((love) => {
                item.Id == love.Id ? final.push({ Id: item.Id, score: item.during + love.score, during: item.during, love: love.score }) : final
            })
        })

        final = final.sort(function (a, b) {
            return a.score > b.score ? -1 : 1 //排序
        });

        const ans1 = await process_time(position, data["time"], final, Spot);
        var all_steps = await Optimization(ans1);

        const Item = { "steps": all_steps }
        return Item
    },
    getLineString: async (parent, { data }) => {
        var data = JSON.parse(data);
        var geometry = data["geometry"];
        var all_steps_line = await Directions(geometry);

        const Item_geojson = { "geojson": all_steps_line }
        return Item_geojson
    },
    search: async (parent, { Name, Town }, { Spot }) => {
        if ((!Name) && (Town == "所有")) {
            var box = await Spot.find({});
        }
        else if (!Name) {
            var box = await Spot.find({ Town: Town });
        }
        else if (Town == "所有") {
            var box = await Spot.find({ Name: { $regex: Name } });
        }
        else {
            var box = await Spot.find({ Name: { $regex: Name }, Town: Town });
        }
        return box
    },
    register: async (parent, { Name, Email, Password }, { UserModel }) => {
        return await registerUser(Name, Email, Password, UserModel);
    },

    login: async (parent, { Email, Password }, { UserModel }) => {
        return await loginUser(Email, Password, UserModel);
    },

    authToken: async (parent, { Email, Token }, { UserModel }) => {
        return await authoToken(Email, Token, UserModel);
    },

    changePass: async (parent, { Email, currentPassword, passwordToChange }, { UserModel }) => {
        return await changePassword(Email, currentPassword, passwordToChange, UserModel);
    },

    addFav: async (parent, { Email, Name }, { Spot, UserModel }) => { // Name = Name of Spot!
        return await addFavourite(Email, Name, Spot, UserModel);
    },

    delFav: async (parent, { Email, Name }, { Spot, UserModel }) => { // Name = Name of Spot!
        return await delFavourite(Email, Name, Spot, UserModel);
    },

    report: async (parent, { Email, Report, Time }, { ReportModel }) => {
        return await feedbackReport(Email, Report, Time, ReportModel);
    }

};

export default Mutation;