import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primereact/fullcalendar';

export default class Calendar extends Component<any, ICalendar> {

  constructor(props: any) {
    super(props);
    this.state = {
      events: [{
        id: 1,
        start: "2019-04-01",
        title: "Sample Event 1"
      }, {
        id: 2,
        start: "2019-04-11",
        title: "Sample Event 2"
      }],
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridMonth',
        defaultDate: '2019-04-04',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
      }
    };
  }

  render() {
    return (
      <FullCalendar events={this.state.events} options={this.state.options} />
    );
  }
}

interface IEvent {
  id: number;
  start: string;
  title: string
}
interface ICalendar {
  events: IEvent[]
  options: {}
}