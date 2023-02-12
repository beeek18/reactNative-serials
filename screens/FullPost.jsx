import React from 'react'
import { View, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import styled from 'styled-components/native'
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
border-radius:10px;
width: 100%;
height: 250px;
margin-bottom:20px;
`;

const PostText = styled.Text`
font-size:18px;
line-height:24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  const { id, title } = route.params

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });

    setIsLoading(true)
    axios
      .get('https://63e7ae4fac3920ad5be1e468.mockapi.io/serials' + id)
      .then(({ data }) => {
        setData(data)
      })
      .catch((err) => {
        console.warn(err)
        Alert.alert('ERROR', 'ERROR TO GET POST')
      })
      .finally(() => { setIsLoading(false) })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <View style={{ padding: 20 }}>
      {/* <ScrollView style={styled.scrollView}> */}
      <PostImage source={{ uri: data.imageUrl }} />
      <PostText>
        {data.text}
      </PostText>
      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </View>
  )
}