import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useStore } from '../store';
import CommentItem from '../components/CommentItem';
import LoadingSpinner from '../components/LoadingSpinner';
import EditCommentModal from '../components/EditCommentModal';
import { Comment, Post } from '../types';
import { RootStackParamList } from '../navigation/types';

type CommentScreenRouteProp = RouteProp<RootStackParamList, 'CommentScreen'>;

const CommentScreen = () => {
  const route = useRoute<CommentScreenRouteProp>();
  const { postId } = route.params;
  const { posts, comments, loading, error, getComments, updateCommentBody } = useStore();
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      await getComments(postId);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch comments. Please try again.');
    }
  };

  const handleEdit = (comment: Comment) => {
    setSelectedComment(comment);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedComment(null);
  };

  const handleSaveComment = async (commentId: number, body: string) => {
    try {
      await updateCommentBody(commentId, body);
    } catch (error) {
      throw error;
    }
  };

  const renderItem = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} onEdit={handleEdit} />
  );

  // Find the post data
  const post = posts.find((p: Post) => p.id === postId);

  if (loading && comments.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && comments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {post && (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>
      )}
      
      <Text style={styles.commentsTitle}>Comments</Text>
      
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onRefresh={fetchComments}
        refreshing={loading}
      />
      
      <EditCommentModal
        visible={isModalVisible}
        comment={selectedComment}
        onClose={handleCloseModal}
        onSave={handleSaveComment}
        isLoading={loading}
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
  postContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CommentScreen; 