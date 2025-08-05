
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const CommentScreen = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { postId } = route.params;

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.org/comments?postId=${postId}`);
            const json = await response.json();
            setComments(json);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.commentCard}>
            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#009688" />
            </View>
        );
    }

    return (
         <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Comments</Text>
                    </View>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatContainer}
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
   container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    flatContainer: {
        padding: 16,
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
    commentCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Android Shadow
        elevation: 3,
    },
    comment: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#009688',
    },
    body: {
        fontSize: 14,
        color: '#444',
    },
});

export default CommentScreen;
