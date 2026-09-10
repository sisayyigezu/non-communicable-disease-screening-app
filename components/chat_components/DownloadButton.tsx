import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function DownloadButton({callback, disabled=false,style={flexDirection:'row', justifyContent:"center", alignItems:"center"}}:{style?:object,disabled:boolean,callback: ()=>void}){
    return (
        <TouchableOpacity onPress={callback} style={style} disabled={disabled}>
            <MaterialIcons name='download-for-offline' size={45} style={{ fontWeight:600 }} />
            <Text style={{fontWeight:600, fontSize:24}}>
                Download Model
            </Text>
        </TouchableOpacity>
    )
}