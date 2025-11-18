import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData(5, 15)
    const defaultTimeStart = moment()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(7, 'days')
      .toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      labelMode: 'available',
      showNoItems: false
    }
  }

  handleLabelModeChange = (mode) => {
    this.setState({ labelMode: mode })
  }

  handleToggleNoItems = () => {
    this.setState({ showNoItems: !this.state.showNoItems })
  }

  emptyCellLabelRenderer = ({ time, timeEnd, group, groupOrder }) => {
    const { labelMode } = this.state

    if (labelMode === 'none') {
      return null
    }

    if (labelMode === 'available') {
      return (
        <span style={{
          fontSize: '11px',
          color: '#999',
          opacity: 0.6,
          fontWeight: 'normal'
        }}>
          Available
        </span>
      )
    }

    if (labelMode === 'date') {
      return (
        <span style={{
          fontSize: '10px',
          color: '#666',
          fontWeight: '500'
        }}>
          {moment(time).format('MMM D')}
        </span>
      )
    }

    if (labelMode === 'price') {
      const mockPrice = Math.floor(Math.random() * 200) + 50
      return (
        <span style={{
          fontSize: '11px',
          color: '#2c5aa0',
          fontWeight: '600'
        }}>
          €{mockPrice}
        </span>
      )
    }

    if (labelMode === 'minStay') {
      const mockMinStay = Math.floor(Math.random() * 5) + 1
      return (
        <span style={{
          fontSize: '10px',
          color: '#d97706',
          fontWeight: '500'
        }}>
          {mockMinStay} nights min
        </span>
      )
    }

    if (labelMode === 'groupSpecific') {
      const groupColors = {
        1: '#2c5aa0',
        2: '#d97706',
        3: '#059669',
        4: '#dc2626',
        5: '#7c3aed'
      }
      const color = groupColors[group.id] || '#666'
      
      return (
        <span style={{
          fontSize: '10px',
          color: color,
          fontWeight: '500',
          opacity: 0.8
        }}>
          {group.title.substring(0, 3).toUpperCase()}
        </span>
      )
    }

    if (labelMode === 'conditional') {
      const dayOfWeek = moment(time).day()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      if (isWeekend) {
        return (
          <span style={{
            fontSize: '10px',
            color: '#dc2626',
            fontWeight: '600'
          }}>
            Weekend
          </span>
        )
      }
      
      return (
        <span style={{
          fontSize: '10px',
          color: '#059669',
          fontWeight: '500'
        }}>
          Weekday
        </span>
      )
    }

    return null
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd, labelMode, showNoItems } = this.state
    const displayItems = showNoItems ? [] : items

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Empty Cell Labels Demo</h3>
          <p style={{ marginBottom: '15px', color: '#666' }}>
            This demo shows how to use the <code>emptyCellLabelRenderer</code> prop to display labels in empty cells.
            The renderer receives: <code>{`{ time, timeEnd, group, groupOrder }`}</code>
          </p>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Label Mode:</strong>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { value: 'none', label: 'None' },
              { value: 'available', label: 'Available' },
              { value: 'date', label: 'Date' },
              { value: 'price', label: 'Price (Mock)' },
              { value: 'minStay', label: 'Min Stay (Mock)' },
              { value: 'groupSpecific', label: 'Group Specific' },
              { value: 'conditional', label: 'Conditional (Weekend/Weekday)' }
            ].map(mode => (
              <button
                key={mode.value}
                onClick={() => this.handleLabelModeChange(mode.value)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: labelMode === mode.value ? '#2c5aa0' : 'white',
                  color: labelMode === mode.value ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showNoItems}
                onChange={this.handleToggleNoItems}
                style={{ cursor: 'pointer' }}
              />
              <strong>Test: Show no items</strong>
              <span style={{ color: '#666', fontSize: '12px' }}>
                (Tests empty cell labels when items array is empty)
              </span>
            </label>
          </div>
        </div>

        <Timeline
          key={`${labelMode}-${showNoItems}`}
          groups={groups}
          items={displayItems}
          keys={keys}
          sidebarWidth={150}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          stackItems
          itemHeightRatio={0.75}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          emptyCellLabelRenderer={this.emptyCellLabelRenderer}
        />
      </div>
    )
  }
}

