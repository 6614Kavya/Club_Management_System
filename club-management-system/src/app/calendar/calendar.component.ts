import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  template: ` <full-calendar [options]="calendarOptions"></full-calendar> `,
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'Custom Component Event', date: '2025-04-01', id: 'custom1' },
      { title: 'Another Event', date: '2025-04-02' },
    ],
    eventContent: (arg) => {
      if (arg.event.id === 'custom1') {
        return {
          html: '<div class="custom-event"><b>Special Event</b></div>',
        };
      } else {
        return '';
      }
    },
  };

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr);
  }
}
