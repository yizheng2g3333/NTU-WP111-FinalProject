const Query = {
    spot: async (parent, { Class1 }, { Spot }) => {
        if (!Class1){
            let box = await Spot.find();
            // console.log(box)
            return box
        }
        let box = await Spot.find({ Class1:Class1 });
        let box1 = await Spot.find({ Class2:Class1 });
        let box2 = await Spot.find({ Class3:Class1 });
        box = box.concat(box1)
        box = box.concat(box2)
        return box;
    },
    singlespot: async (parent, { Id }, { Spot }) => {
        // console.log(Id)
        let box = await Spot.find({ Id:Id });
        // console.log(box)
        return box;
    },
    myFav: async (parent, { Email }, { UserModel }) => {
        const user = await UserModel.findOne({
            Email: Email,
        })

        return user;

    }
};
  
export default Query;