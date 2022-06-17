import React from "react";

import PetCard from '../../Components/PetCard'
import DropDownPicker from 'react-native-simple-dropdown-picker';
import { FlatList, View, Text } from 'react-native';

class Pets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToekn: '',
            petData: [],
            value: ''


        };
    }

    componentDidMount() {
        this.loginUser()
    }

    loginUser = async () => {
        const body = {
            email: "ystark+sta28@felmo.de",
            password: "codingchallenge"

        };
        const formBody = Object.keys(body).map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]),
        ).join('&')
        const resonse = await fetch('https://api-staging.felmo.de/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        const jsonResponse = await resonse.json();
        console.log('rsults', jsonResponse.token)
        this.setState({
            accessToekn: jsonResponse.token
        }, this.getPetsResponse)
    }

    getPetsResponse = async () => {
        const petData = await fetch(
            'https://api-staging.felmo.de/v1/app/my-pets',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToekn}`
                }
            }

        )
        const myPets = await petData.json();
        this.setState({
            petData: myPets
        })
    }
    _renderItem = (item) => {
        console.log('pet items', item)
        return <PetCard item={item} />
    };
    filterDate = () => {

        let filterFlag = ''
        console.log('1111', this.state.value)
        if (this.state.value == 'species_id_1') {
            filterFlag = '1'
        }
        else {
            filterFlag = '2'

        }



        console.log('important', this.state.petData.filter(value => { return value.species_id == filterFlag }))
    }
    _filteredData = () => {

        const data = ['species_id_1', 'species_id_2'];
        return (
            <DropDownPicker
                result={this.state.value}
                setResult={data => this.setState({
                    value: data
                }, this.filterDate())}
                // setResult={date1 => console.log('dada',date1)}
                data={data}
                placeholder={'Choose an option'}
            />
        );


    }

    render() {
        return <View style={{ backgroundColor: '#fff', flex: 1 }}>
            {this._filteredData()}
            <FlatList
                data={this.state.petData}
                renderItem={this._renderItem}

            />
        </View>
    }

}

export default Pets
