import React from 'react'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { state } from '../../__fixtures__/stateAndProps'
import { groups } from '../../__fixtures__/itemsAndGroups'
import { defaultTimeSteps, defaultKeys } from '../../src/lib/default-config'
import { GroupRowContextProvider } from '../../src/lib/rows/GroupRowContext'

// eslint-disable-next-line
export const RenderGroupRowWrapper = ({ children, groupRowState = {} }) => {
  const groupRowStateProps = {
    clickTolerance: 20,
    onContextMenu: () => {},
    onClick: () => {},
    onDoubleClick: () => {},
    isEvenRow: true,
    group: groups[1],
    horizontalLineClassNamesForGroup: undefined,
    groupHeight: 60,
    groupIndex: 3,
    ...groupRowState
  }

  return (
    <GroupRowContextProvider {...groupRowStateProps}>
      {children}
    </GroupRowContextProvider>
  )
}
