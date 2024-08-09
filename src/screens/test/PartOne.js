import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import localPlaceholderData from '../../localPlaceholderData';

const { width } = Dimensions.get('window');

/**
 * @typedef {Object} Post
 * @property {number} id - The unique identifier of the post
 * @property {number} userId - The user ID associated with the post
 * @property {string} title - The title of the post
 * @property {string} body - The body content of the post
 */

/**
 * Renders a single item in the FlatList
 * @param {Object} props - The props object
 * @param {Post} props.item - The post item to render
 * @returns {React.ReactElement} The rendered item
 */
const renderItem = ({ item }) => (
  <View style={styles.row}>
    <MaterialCommunityIcons name="post-outline" size={24} color="#333" />
    <View style={styles.textContainer}>
      <Text style={styles.id}>ID: {item.id}</Text>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
    </View>
    <AntDesign name="right" size={24} color="#333" style={styles.chevron} />
  </View>
);

/**
 * PartOne component that displays a list of posts
 * @returns {React.ReactElement} The PartOne component
 */
export default function PartOne() {
  return (
    <FlatList
      data={localPlaceholderData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

/**
 * Styles for the PartOne component
 * @constant
 * @type {Object}
 */
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    maxWidth: width * 0.5,
  },
  id: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: '#666',
  },
  chevron: {
    marginLeft: 'auto',
  },
});