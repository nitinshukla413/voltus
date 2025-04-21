import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Comment } from '../types';

interface CommentItemProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
}

const CommentItem = React.memo(({ comment, onEdit }: CommentItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{comment.name}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(comment)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.email}>{comment.email}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  email: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CommentItem; 