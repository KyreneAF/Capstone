import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LikedSongs from '../../LikedSongs/LikedSongs'
import UserSongs from '../UserSongs';
import './TabsComponent.css'

function TabsComponent(){



return(

  <Tabs>
    <TabList id='tabs-main-cont'>
      <Tab id='tab'>Uploaded Songs</Tab>
      <Tab >Liked Songs</Tab>
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
