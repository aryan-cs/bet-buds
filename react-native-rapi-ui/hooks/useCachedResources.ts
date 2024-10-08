import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import { Asset } from 'expo-asset';

export default function useCachedResources(
	images?: Array<any> | null,
	fonts?: any
) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				// Load fonts
				await Promise.all([
					images && Asset.loadAsync(images),
					Font.loadAsync({
						...Ionicons.font,
						Ubuntu_300Light: require('../fonts/Roboto-Light.ttf'),
						Ubuntu_300Light_Italic: require('../fonts/Roboto-LightItalic.ttf'),
						Ubuntu_400Regular: require('../fonts/Roboto-Regular.ttf'),
						Ubuntu_400Regular_Italic: require('../fonts/Roboto-Italic.ttf'),
						Ubuntu_500Medium: require('../fonts/Roboto-Medium.ttf'),
						Ubuntu_500Medium_Italic: require('../fonts/Roboto-MediumItalic.ttf'),
						Ubuntu_700Bold: require('../fonts/Roboto-Bold.ttf'),
						Ubuntu_700Bold_Italic: require('../fonts/Roboto-BoldItalic.ttf'),
						...fonts,
					}),
				]);
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}
