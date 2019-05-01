import { peopleActions } from '../store/actions';

export const runSyncer = () => {
    peopleActions.fetchAll();
}