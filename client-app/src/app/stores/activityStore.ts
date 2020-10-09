import { observable, action, computed } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      }).finally(() => this.loadingInitial = false);
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try{
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
      this.editMode = false;
    }
    catch(error){
      this.submitting = false;
      console.log(error);
    }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try{
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch(error) {
      this.submitting = false;
      console.log(error);
    }
    this.selectedActivity = undefined;
  }

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  }
}

export default createContext(new ActivityStore());