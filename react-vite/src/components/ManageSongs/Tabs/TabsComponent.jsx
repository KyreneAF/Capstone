import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LikedSongs from '../../LikedSongs/LikedSongs'
import UserSongs from '../UserSongs';

function TabsComponent(){

return(

  <Tabs>
    <TabList>
      <Tab><h3>Uploaded Songs</h3></Tab>
      <Tab><h3>Favorites</h3></Tab>
    </TabList>

    <TabPanel>
      <UserSongs />
    </TabPanel>
    <TabPanel>
        <LikedSongs />
      {/* <h2>Any content 2</h2> */}
    </TabPanel>
  </Tabs>
)
};

export default TabsComponent;
