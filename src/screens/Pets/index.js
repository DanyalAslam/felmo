import React from "react";

import PetCard from '../../Components/PetCard'
import DropDownPicker from 'react-native-simple-dropdown-picker';
import { FlatList, View, Text } from 'react-native';
import { vh } from "../../utils/Units";
import { ActivityIndicator } from 'react-native';

class Pets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToekn: '',
            petData: [],
            ppetDataCopy: [],
            value: '',
            showLoading : true


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
            petData: myPets,
            ppetDataCopy: myPets,
            showLoading:false
        })
    }
    _renderItem = (item) => {
        console.log('pet items', item)
        return <PetCard item={item} />
    };
    filterDate = () => {

        this.setState({
            petData: this.state.ppetDataCopy,
            showLoading:true
        }, () => {

            let filterFlag = ''
            if (this.state.value == 'species_id_1') {
                filterFlag = '1'
            }
            else {
                filterFlag = '2'
            }

            let filteredPetData = this.state.petData.filter(value => { return value.species_id == filterFlag })
            this.setState({
                petData: filteredPetData,
                showLoading:false
            })

        })
    }

    //for the filter part, there was no sex parameter in the response so I just made filteration using specie id
    _filteredData = () => {

        const data = ['species_id_1', 'species_id_2'];
        return (
            <DropDownPicker
                result={this.state.value}
                setResult={data => this.setState({
                    value: data
                }, this.filterDate())}

                data={data}
                placeholder={'Choose an option'}
            />
        );


    }

    render() {
        return <View style={{ backgroundColor: '#fff', flex: 1, paddingVertical: 3 * vh }}>
           {this.state.showLoading ? <ActivityIndicator size='large' color='green'  />  :<>{this._filteredData()}
            <FlatList
                data={this.state.petData}
                renderItem={this._renderItem}

            /></>}
        </View>
    }

}

export default Pets
