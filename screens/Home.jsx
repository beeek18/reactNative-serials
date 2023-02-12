import React from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import {
  Alert,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

import { Loading } from '../components/Loading';
import { Post } from '../components/Post';


export const HomeScreen = ({ navigation }) => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchPosts = () => {
    setIsLoading(true)

    axios
      .get('https://63e7ae4fac3920ad5be1e468.mockapi.io/serials')
      .then(({ data }) => {
        setItems(data)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('ERROR', 'ERROR TO GET SERIALS')
      })
      .finally(() => { setIsLoading(false) })
  }

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <View >
      <FlatList
        refreshControl={<RefreshControl
          refreshing={isLoading}
          onRefresh={fetchPosts}
        />}

        data={items}

        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>

        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}