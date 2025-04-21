import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import { useStore } from '../store';
import PostItem from '../components/PostItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Post } from '../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type PostListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostList'>;

const PostListScreen = () => {
  const navigation = useNavigation<PostListScreenNavigationProp>();
  const { posts, loading, error, getPosts, setSelectedPost } = useStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      await getPosts();
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch posts. Please try again.');
    }
  };

  const handlePostPress = (postId: number) => {
    setSelectedPost(postId);
    navigation.navigate('CommentScreen', { postId });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem post={item} onPress={handlePostPress} />
  );

  if (loading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.title}>All Posts</Text>}
        onRefresh={fetchPosts}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PostListScreen; 