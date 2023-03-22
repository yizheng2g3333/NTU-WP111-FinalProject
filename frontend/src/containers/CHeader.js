import styled from 'styled-components';
import { Input, Select, Button, Layout, Tooltip } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

const { Header } = Layout;
const CustomizeHeader = styled(Header)`
    border-radius: 10px;
    margin: 10px;
    overflow: hidden;
    &.ant-layout-header {
      background: white;
      height: 20vh;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-y: scroll;
    &>div>div{
      width: 40%;
      min-width: 300px;
      display: flex;
      align-items: center;
      float: left;
      &>.cinput, input{
        width: 60% !important;
        height: 45px !important;
        display: flex;
        align-items: center;
        font-size: 15px;
        margin: 0 5px;
        &>.ant-select-selector{
          height: 100% important;
          display: flex;
          align-items: center;
          padding: 0 10px;
        }
      }
    }
    & span{
      font-weight: 800;
      font-size: 15px;
    }
    & Button{
      border: none;
      box-shadow: none;
      &:hover{
        background: #e790b3 !important;
        transform: scale(1.05);
      }
    }
    & UserOutlined{
      color: red !important;
    }
`;

const CHeader = ({sumbit, onChange, handleChange, options}) => {
    return (
        <>
            <CustomizeHeader>
              <div>
                <div>
                  依照名稱找
                  <Input className="cinput" onChange={onChange} />
                </div>

                <div>
                  依照地區找
                  <Select
                    showSearch
                    className="cinput"
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    options={options}
                    onChange={handleChange}
                    defaultValue="大安區"
                  />
                </div>
              </div>
              <Tooltip title="search">
                <Button 
                  type="primary"  
                  shape="circle" 
                  icon={<SearchOutlined />} 
                  onClick={sumbit} 
                  style={{color:"white"}} 
                />
              </Tooltip>
            </CustomizeHeader>
        </>
    )

}

export default CHeader