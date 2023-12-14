import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const images = [
    require('../images/emoji1.png'),
    require('../images/emoji2.png'),
    require('../images/emoji3.png'),
    require('../images/emoji4.png'),
]

const DropdownModalScreen = ({ isVisible, onClose, onSelectImage }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.imageContainer}
            onPress={() => onSelectImage(index + 1)}
          >
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default DropdownModalScreen;