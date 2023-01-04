import React, { useState } from 'react';
import PropTypes from "prop-types";
import Icon from '../Icons/Icon';

import * as styles from './NotificationBanner.module.css';

const NotificationBanner = ({
  msg = ''
}) => {
  const [displayBanner, setDisplayBanner] = useState(true);

  return (
    displayBanner && (
      <div className={styles.banner}>
        <div
          className={styles.closeContainer}
          role="button"
          onClick={() => setDisplayBanner(false)}
          onKeyUp={() => setDisplayBanner(false)}
          tabIndex="0"
        >
            <Icon symbol={'cross'}></Icon>
        </div>
        <p>{msg}</p>
      </div>
    )
  );
};

NotificationBanner.propTypes = {
  msg: PropTypes.string,
}

NotificationBanner.defaultProps = {
  msg: ``,
}

export default NotificationBanner;
