import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hstkFetch from '../../hstkFetch';

/**
 * @typedef {Object} Post
 * @property {number} id - The unique identifier of the post
 * @property {string} title - The title of the post
 * @property {string} body - The body of the post
 */

/**
 * @typedef {Object} Comment
 * @property {number} id - The unique identifier of the comment
 * @property {string} email - The email of the commenter
 * @property {string} body - The body of the comment
 */

/**
 * PartThreeDetail component displaying a single post and its comments
 * @returns {React.ReactElement} The PartThreeDetail component
 */
export default function PartThreeDetail() {
  /** @type {[Post | null, React.Dispatch<React.SetStateAction<Post | null>>]} */
  const [post, setPost] = useState(null);
  /** @type {[Comment[], React.Dispatch<React.SetStateAction<Comment[]>>]} */
  const [comments, setComments] = useState([]);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [loading, setLoading] = useState(true);
  /** @type {[Set<number>, React.Dispatch<React.SetStateAction<Set<number>>>]} */
  const [hiddenComments, setHiddenComments] = useState(new Set());
  const route = useRoute();
  /** @type {number} */
  const { id } = route.params;

  useEffect(() => {
    fetchPostAndComments();
    loadHiddenComments();
  }, []);

  /**
   * Fetches the post and its comments from the API
   * @returns {Promise<void>}
   */
  const fetchPostAndComments = async () => {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
        hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      ]);
      const postData = await postResponse.json();
      const commentsData = await commentsResponse.json();
      setPost(postData);
      setComments(commentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post and comments:', error);
      setLoading(false);
    }
  };

  /**
   * Loads hidden comments from AsyncStorage
   * @returns {Promise<void>}
   */
  const loadHiddenComments = async () => {
    try {
      const hiddenCommentsString = await AsyncStorage.getItem(`hiddenComments_${id}`);
      if (hiddenCommentsString) {
        setHiddenComments(new Set(JSON.parse(hiddenCommentsString)));
      }
    } catch (error) {
      console.error('Error loading hidden comments:', error);
    }
  };

  /**
   * Hides a comment and saves the state to AsyncStorage
   * @param {number} commentId - The ID of the comment to hide
   * @returns {Promise<void>}
   */
  const hideComment = async (commentId) => {
    const newHiddenComments = new Set(hiddenComments);
    newHiddenComments.add(commentId);
    setHiddenComments(newHiddenComments);
    try {
      await AsyncStorage.setItem(`hiddenComments_${id}`, JSON.stringify([...newHiddenComments]));
    } catch (error) {
      console.error('Error saving hidden comments:', error);
    }
  };

  /**
   * Renders an individual comment item
   * @param {Object} props - The props object
   * @param {Comment} props.item - The comment item to render
   * @returns {React.ReactElement | null} The rendered comment item or null if hidden
   */
  const renderCommentItem = ({ item }) => {
    if (hiddenComments.has(item.id)) return null;
    return (
      <View style={styles.commentItem}>
        <Text style={styles.commentEmail}>{item.email}</Text>
        <Text style={styles.commentBody}>{item.body}</Text>
        <TouchableOpacity
          style={styles.hideButton}
          onPress={() => hideComment(item.id)}
        >
          <Text style={styles.hideButtonText}>Hide</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.commentsHeader}>Comments:</Text>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

/**
 * Styles for the PartThreeDetail component
 * @constant
 * @type {Object.<string, Object>}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  commentEmail: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentBody: {
    fontSize: 14,
  },
  hideButton: {
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  hideButtonText: {
    fontSize: 12,
  },
});