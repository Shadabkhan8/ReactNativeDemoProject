import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const products = [
    {
        id: '1',
        title: 'Smart Watch',
        price: '₹1,999',
        image: 'https://images.pexels.com/photos/23474/pexels-photo.jpg',
    },
    {
        id: '2',
        title: 'Bluetooth Speaker',
        price: '₹899',
        image: 'https://images.pexels.com/photos/14309811/pexels-photo-14309811.jpeg',
    },
    {
        id: '3',
        title: 'Wireless Headphones',
        price: '₹1,499',
        image: 'https://images.pexels.com/photos/6686448/pexels-photo-6686448.jpeg',
    },
    {
        id: '4',
        title: 'Power Bank',
        price: '₹699',
        image: 'https://images.pexels.com/photos/5208772/pexels-photo-5208772.jpeg',
    },
    {
        id: '5',
        title: 'Smartphone Stand',
        price: '₹299',
        image: 'https://images.pexels.com/photos/19238584/pexels-photo-19238584.jpeg',
    },
];

const CardScrollScreen = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = (item) => {
        setSelectedProduct(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <Pressable style={styles.card} onPress={() => handlePress(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Top Deals</Text>
            </View>

            <ScrollView
                horizontal
                pagingEnabled
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20 }}
            >
                {products.map((item) => (
                    <View key={item.id}>
                        {renderItem({ item })}
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Sheet Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.dragHandle} />
                        {selectedProduct && (
                            <>
                                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                                <Text style={styles.modalPrice}>{selectedProduct.price}</Text>

                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CardScrollScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#009688',
        paddingVertical: 40,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20,
    },
    cardWrapper: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width * 0.9,
        height: height * 0.6,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: height * 0.5,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    info: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00796b',
        marginBottom: 6,
    },
    price: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',    },
    modalContainer: {
        width: '100%',
        height: '30%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalPrice: {
        fontSize: 20,
        color: '#009688',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#009688',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
