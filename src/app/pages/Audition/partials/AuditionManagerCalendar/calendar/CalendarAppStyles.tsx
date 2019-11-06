import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
      height: '80vh',
      paddingBottom: 0,
      '& .rbc-header': {
          padding: '12px 6px',
          fontWeight: 600,
          fontSize: 14
      },
      '& .rbc-label': {
          padding: '8px 6px'
      },
      '& .rbc-today': {
          backgroundColor: 'transparent'
      },
      '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
          borderBottom: '2px solid ' + theme.palette.secondary.main + '!important'
      },
      '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
          padding: 24,
          [theme.breakpoints.down('sm')]: {
              padding: 16
          },
          ...theme.mixins.border(0)
      },
      '& .rbc-agenda-view table': {
          ...theme.mixins.border(1),
          '& thead > tr > th': {
              ...theme.mixins.borderBottom(0)
          },
          '& tbody > tr > td': {
              padding: '12px 6px',
              '& + td': {
                  ...theme.mixins.borderLeft(1)
              }
          }
      },
      '& .rbc-time-view': {
          '& .rbc-time-header': {
              ...theme.mixins.border(1)
          },
          '& .rbc-time-content': {
              flex: '0 1 auto',
              ...theme.mixins.border(1)
          }
      },
      '& .rbc-month-view': {
          '& > .rbc-row': {
              ...theme.mixins.border(1)
          },
          '& .rbc-month-row': {
              ...theme.mixins.border(1),
              borderWidth: '0 1px 1px 1px!important',
              minHeight: 128
          },
          '& .rbc-header + .rbc-header': {
              ...theme.mixins.borderLeft(1)
          },
          '& .rbc-header': {
              ...theme.mixins.borderBottom(0)
          },
          '& .rbc-day-bg + .rbc-day-bg': {
              ...theme.mixins.borderLeft(1)
          }
      },
      '& .rbc-day-slot .rbc-time-slot': {
          ...theme.mixins.borderTop(1),
          opacity: 0.5
      },
      '& .rbc-time-header > .rbc-row > * + *': {
          ...theme.mixins.borderLeft(1)
      },
      '& .rbc-time-content > * + * > *': {
          ...theme.mixins.borderLeft(1)
      },
      '& .rbc-day-bg + .rbc-day-bg': {
          ...theme.mixins.borderLeft(1)
      },
      '& .rbc-time-header > .rbc-row:first-child': {
          ...theme.mixins.borderBottom(1)
      },
      '& .rbc-timeslot-group': {
          minHeight: 64,
          ...theme.mixins.borderBottom(1)
      },
      '& .rbc-date-cell': {
          padding: 8,
          fontSize: 16,
          fontWeight: 400,
          opacity: .5,
          '& > a': {
              color: 'inherit'
          }
      },
      '& .rbc-event': {
          borderRadius: 4,
          padding: '4px 8px',
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          boxShadow: theme.shadows[0],
          transitionProperty: 'box-shadow',
          transitionDuration: theme.transitions.duration.short,
          transitionTimingFunction: theme.transitions.easing.easeInOut,
          position: 'relative',
          '&:hover': {
              boxShadow: theme.shadows[2]
          }
      },
      '& .rbc-row-segment': {
          padding: '0 4px 4px 4px'
      },
      '& .rbc-off-range-bg': {
          backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
      },
      '& .rbc-show-more': {
          color: theme.palette.secondary.main,
          background: 'transparent'
      },
      '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
          position: 'static'
      },
      '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child': {
          left: 0,
          top: 0,
          bottom: 0,
          height: 'auto'
      },
      '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child': {
          right: 0,
          top: 0,
          bottom: 0,
          height: 'auto'
      }
  },
  addButton: {
      position: 'absolute',
      right: 12,
      top: 172,
      zIndex: 99
  }
}));

export default useStyles