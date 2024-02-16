import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import LikedSongs from '../../LikedSongs/LikedSongs'
import UserSongs from '../UserSongs';

function TabsComponent(){


return(

  <Tabs>
    <TabList>
      <Tab><h3>Uploaded Songs</h3></Tab>
      <Tab><h3>Liked Songs</h3></Tab>
    </TabList>

    <TabPanel>
      <UserSongs />
    </TabPanel>
    <TabPanel>
        <LikedSongs />
    </TabPanel>
  </Tabs>
)
};

export default TabsComponent;
