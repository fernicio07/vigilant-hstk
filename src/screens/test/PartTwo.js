import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import hstkFetch from '../../hstkFetch';

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
 * PartTwo component that displays a list of posts with search functionality
 * @returns {React.ReactElement} The PartTwo component
 */
export default function PartTwo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Fetches posts from the API
   */
  const fetchPosts = async () => {
    try {
      const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  /**
   * Filters posts based on the search text
   * @returns {Post[]} Filtered posts
   */
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  /**
   * Renders the header component with search input
   * @returns {React.ReactElement} The header component
   */
  const renderHeader = () => (
    <TextInput
      style={styles.searchInput}
      placeholder="Search by title"
      value={searchText}
      onChangeText={setSearchText}
    />
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredPosts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderHeader}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <Text style={styles.noResults}>No Results</Text>
      }
    />
  );
}

/**
 * Styles for the PartTwo component
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});