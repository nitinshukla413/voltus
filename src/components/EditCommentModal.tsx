import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Comment } from '../types';

interface EditCommentModalProps {
  visible: boolean;
  comment: Comment | null;
  onClose: () => void;
  onSave: (commentId: number, body: string) => Promise<void>;
  isLoading: boolean;
}

const EditCommentModal = ({
  visible,
  comment,
  onClose,
  onSave,
  isLoading,
}: EditCommentModalProps) => {
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    if (comment) {
      setCommentBody(comment.body);
    }
  }, [comment]);

  const handleSave = async () => {
    if (!comment) return;
    
    try {
      await onSave(comment.id, commentBody);
      Alert.alert('Success', 'Comment updated successfully!');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to update comment. Please try again.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Comment</Text>
          
          {comment && (
            <>
              <Text style={styles.commentInfo}>
                <Text style={styles.label}>Name: </Text>
                {comment.name}
              </Text>
              <Text style={styles.commentInfo}>
                <Text style={styles.label}>Email: </Text>
                {comment.email}
              </Text>
            </>
          )}
          
          <TextInput
            style={styles.input}
            value={commentBody}
            onChangeText={setCommentBody}
            multiline
            numberOfLines={4}
            placeholder="Enter comment..."
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  commentInfo: {
    fontSize: 14,
    marginBottom: 8,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#95a5a6',
  },
  buttonSave: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditCommentModal; 