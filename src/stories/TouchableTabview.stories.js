import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import { TouchableTabview } from '../TouchableTabview'

const stories = storiesOf('Touchable Test', module)

stories.add('App', () => {
  return (
    <TouchableTabview
      tabBarPosition='bottom'
      initialTab={1}
      renderTabBar={({ tabs, onChangeTab }) => (
        <div>
          {tabs.map((tab, tabIndex) => (
            <span key={tabIndex} style={{ marginRight: 10 }} onClick={() => onChangeTab(tabIndex)}>{tab.label}</span>
          ))}
        </div>
      )}
    >
      <div tabLabel='Incom'>
        <p>Income</p>
      </div>
      <div tabLabel='History'>
        <p>History</p>
      </div>
    </TouchableTabview>
  )
})