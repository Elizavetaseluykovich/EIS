import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { get_all} from "../GraphQL/queries";
import {List, Descriptions, Select, Spin, Input, Button} from 'antd';

function Main() {
    const { Option } = Select;
    const [cur, setCur] = useState('');
    const [continent, setContinent] = useState('');
    const [code, setCode] = useState('');
    const [filter, setFilter] = useState({});
    const [array, setArray] = useState([]);
    const [continents, setContinents] = useState([]);
    const {data, loading, error} = useQuery(get_all, {
        variables: {
            filter
        }
    });

    useEffect(() => {
        if (data) {
            setArray([...data.countries]);
            setContinents([...data.continents])
        }
    }, [data])

    function Filter() {
        let filter = {};
        if (cur) {
            filter = {...filter, currency: {eq: cur.toUpperCase()}}
        } 
        if (code) {
            filter = {...filter, code: {eq: code.toUpperCase()}}
        }
        if (continent) {
            filter = {...filter, continent: {eq: continent}}
        }
        setFilter({...filter});
    }

    if (error) return <p> Errro ...</p>

    return (
        <div className="container">
            <div className="filter-container">
                <Input style={{width: "100%", marginBottom: 20}} placeholder="ISO code" value={code} onChange={(e) => setCode(e.target.value)}/>
                <Input style={{width: "100%", marginBottom: 20}} placeholder="Currency" value={cur} onChange={(e) => setCur(e.target.value)}/>
                <Select 
                    placeholder="Continent"
                    style={{width: "100%", marginBottom: 20}}
                    onChange={(value) => setContinent(value)}>
                        <Option key={0} value={''}>None</Option>
                        {continents.map((item, index) => <Option key={index+1} value={item.code}>{item.name}</Option>)}
                </Select>
                <Button style={{width: "100%"}} type="primary" onClick={Filter}>Find</Button>
            </div>
            <div className="content-container">
                { loading ?  <Spin style={{display: "block", margin: "0 auto"}}/> :
                <List 
                    dataSource={array}
                    bordered
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <Descriptions>
                                <Descriptions.Item contentStyle={{fontWeight: 'bold'}} label="Country">{item.name}</Descriptions.Item>
                                <Descriptions.Item label="ISO code">{item.code}</Descriptions.Item>
                                <Descriptions.Item label="continent">{item.continent.name}</Descriptions.Item>
                                <Descriptions.Item label="capital">{item.capital}</Descriptions.Item>
                                <Descriptions.Item label="languages">{item.languages.map((item, index) => <p key={index} style={{paddingRight: 4}}>{item.name}</p>)}</Descriptions.Item>
                                <Descriptions.Item label="currency">{item.currency}</Descriptions.Item>
                            </Descriptions>
                        </List.Item>
                    )}>
                </List>}
            </div>
        </div>
    )
}

export default Main;