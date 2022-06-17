import React from 'react';
import { vh, vw } from '../../utils/Units'
import { View, Text, Image } from "react-native"

const PetCard = (props) => {
    return <View style={{
        height: 13 * vh,
        marginTop: 2 * vh,
        width: 90 * vw, backgroundColor: '#fff',

        elevation: 4 * vh,
        flexDirection: 'row',
        paddingHorizontal: 2 * vw,
        alignSelf: 'center',
        borderRadius: 2 * vw,
        marginBottom: 2 * vh
    }}>

        <View style={{ height: 13 * vh, width: 20 * vw, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={{ width: 18 * vw, height: 10 * vh }}
                source={{ uri: props.item.item.image_url }}
                resizeMode='stretch'
            />

        </View>

        <View style={{ height: 13 * vh, width: 60 * vw, justifyContent: 'center', marginLeft: 2 * vw }}>

            <Text style={{ fontWeight: 'bold' }}>{props.item.item.name}</Text>
            <Text>{props.item.item.description}</Text>

        </View>
        <View style={{ height: 13 * vh, width: 10 * vw }}>



        </View>



    </View>
}
export default PetCard