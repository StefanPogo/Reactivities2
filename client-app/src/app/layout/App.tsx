import React, { useEffect, useContext, Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import  NavBar  from "../../features/nav/NavBar";
import ActivityDashBoard  from "../../features/activities/dashboard/ActivityDashBoard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import {observer} from 'mobx-react-lite'

const App = () => {
  
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."/>
  
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
