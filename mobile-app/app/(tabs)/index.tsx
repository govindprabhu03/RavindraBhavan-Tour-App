import { router } from 'expo-router';
import { ScrollScrubVideoStage } from '../../src/components/ScrollScrubVideoStage';
import { tourScenes } from '../../src/data/venue';

export default function TourScreen() {
  return (
    <ScrollScrubVideoStage
      videoSource={require('../../assets/tour-video/ravindra-bhavan-tour.mp4')}
      scenes={tourScenes}
      onReachEnd={() => router.push('/about')}
    />
  );
}
