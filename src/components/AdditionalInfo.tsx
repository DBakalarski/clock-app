import { Nullable } from '../helpers/types';
import classes from './AdditionalInfo.module.css';
import { IAdditionalData } from './TimeContainer';
import { useEffect } from 'react';

const AdditionalInfo: React.FC<{
  data: Nullable<IAdditionalData>;
  isVisible: boolean;
}> = (props) => {
  const additioanClass = !props.isVisible
    ? classes.additional
    : `${classes.additional} ${classes.isVisible}`;

  useEffect(() => {
    if (props.isVisible) {
    }
  }, []);

  return (
    <div className={additioanClass}>
      <div className={classes.items}>
        <div className={classes.item}>
          <span className={classes.label}>CURRENT TIMEZONE</span>
          <span className={classes.value}>{props.data?.timezone}</span>
        </div>
        <div className={classes.item}>
          <span className={classes.label}>Day of the year</span>
          <span className={classes.value}>{props.data?.dayOfYear}</span>
        </div>
        <div className={classes.item}>
          <span className={classes.label}>Day of the week</span>
          <span className={classes.value}>{props.data?.dayOfWeek}</span>
        </div>
        <div className={classes.item}>
          <span className={classes.label}>Week number</span>
          <span className={classes.value}>{props.data?.weekNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
