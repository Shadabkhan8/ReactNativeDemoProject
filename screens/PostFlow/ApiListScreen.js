
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ApiListScreen = () => {
    const [allData, setAllData] = useState([]);
    const [visibleData, setVisibleData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.org/posts');
            const json = await response.json();
            setAllData(json);
            setVisibleData(json.slice(0, itemsPerPage));
        } catch (error) {
            Alert.alert(
                'Error',
                'There was an error fetching the data. Please try again later.',
                [{ text: 'Retry' }]);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = () => {
        if (loadingMore) return;

        setLoadingMore(true);
        setTimeout(() => {
        const nextPage = page + 1;
        const start = (nextPage - 1) * itemsPerPage; 
        const end = start + itemsPerPage;

        const newItems = allData.slice(start, end);
        if (newItems.length > 0) {
            setVisibleData(prev => [...prev, ...newItems]);
            setPage(nextPage);
        }
        setLoadingMore(false);
    }, 500);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CommentScreen', { postId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.slug}</Text>
                <Text numberOfLines={2} style={styles.email}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderImage = ({ item }) => (
        <TouchableOpacity
            style={styles.cardStory}
            onPress={() => navigation.navigate('CommentScreen', { postId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.avatarStory} />
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#009688" />
            </View>
        );
    }

    const storyData = allData.slice(0, 5);
    const mainListData = visibleData.filter(item => !storyData.some(story => story.id === item.id));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Posts</Text>
            </View>

            <FlatList
                data={mainListData}
                keyExtractor={(item) => `main-${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={styles.flatContainer}
                contentInsetAdjustmentBehavior='automatic'
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={() => (
                    <FlatList
                        data={storyData}
                        keyExtractor={(item) => `story-${item.id}`}
                        renderItem={renderImage}
                        contentContainerStyle={styles.flatImage}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
                ListFooterComponent={() =>
                    loadingMore ? (
                        <View style={styles.footerLoader}>
                            <ActivityIndicator size="small" color="#009688" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    flatImage: {
        flexDirection: 'row',
        padding: 16,
        gap: 10,
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
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    avatarStory: {
        width: 60,
        height: 60,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardStory: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 35,
        marginBottom: 12,
        alignItems: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#333',
    },
});

export default ApiListScreen;
