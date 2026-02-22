import { StyleSheet } from "react-native";
import { PAGE_HEIGHT } from "../../common/Constant";


export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        height: PAGE_HEIGHT,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    retryOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    retryText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});