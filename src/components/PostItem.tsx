import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Post } from '../types';

interface PostItemProps {
  post: Post;
  onPress: (postId: number) => void;
}

const PostItem = React.memo(({ post, onPress }: PostItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(post.id)}
      activeOpacity={0.7}
    >
      <View style={styles.postContainer}>
        <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
        <Text style={styles.body} numberOfLines={3}>{post.body}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostItem; 