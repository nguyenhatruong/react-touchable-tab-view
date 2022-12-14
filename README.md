
## react-touchable-tab-view

## Add it to your project

1. Run `npm install react-touchable-tab-view --save` or `yarn add react-touchable-tab-view --save`
2. `import TouchableTabView from 'react-touchable-tab-view'`


## Basic usage

```javascript
import TouchableTabView from 'react-touchable-tab-view'

const App = () => {

  const renderTabBar = ({ tabs, onChangeTab, currentTab }) => {
    return (
      <div>
        {tabs.map((tab, tabIndex) => (
          <span
            key={tabIndex}
            style={{ marginRight: 10 }}
            onClick={() => onChangeTab(tabIndex)}
          >
            <i className={tab.icon} />
            {tab.label}
          </span>
        ))}
      </div>
    )
  }

  return (
    <TouchableTabView renderTabBar={renderTabBar}>
      <ReactPage tabLabel='React' tabIcon='icon-react' className='h-full' />
      <FlowPage tabLabel='Flow' tabIcon='icon-flow' className='h-full' />
      <JestPage tabLabel='Jest' tabIcon='icon-jest' className='h-full' />
    </TouchableTabView>
  );
}
```

## Props

- **`renderTabBar`** _(Function:ReactComponent)_ - accept 1 argument `props` and should return a component to use as
  the tab bar. The component has `onChangeTab`, `tabs`, `currentTab`.
- **`tabBarPosition`** _(String)_ Defaults to `'top'`.
  - `"bottom"` to position the tab bar below content.
- **`onChangeTab`** _(Function)_ - function to call when tab changes, should accept 1 argument which is an Object containing two keys: `i`: the index of the tab that is selected, `ref`: the ref of the tab that is selected
- **`initialTab`** _(Integer)_ - the index of the initially selected tab, defaults to 0 === first tab.
- **`children`** _(ReactComponents)_ - each top-level child component should have a `tabLabel` and `tabIcon` prop that can be used by the tab bar component to render out the labels. The default tab bar expects it to be a string, but you can use anything you want if you make a custom tab bar.

---

**MIT Licensed**
