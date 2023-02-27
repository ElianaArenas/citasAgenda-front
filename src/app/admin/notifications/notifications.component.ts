import { Component } from '@angular/core';
import { AgendaService } from 'src/app/service/agenda.service';
import { NotificacionService } from 'src/app/service/notificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notifications!: any[];
  constructor(
    private notificationService: NotificacionService,
    private agendaService: AgendaService
  ) {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      if (!res) {
        Swal.fire('Error', 'Hubo un error en la petición', 'error');
        return;
      }
      if (typeof res === 'object') {
        const response = res as any;
        this.notifications = response.notificaciones.filter(
          (notification: any) => notification.activo === true
        );
        console.log(this.notifications);
      }
    });
  }

  cancelTurno(notification: any) {
    const updateSchedule = {
      dia: notification.diaTurno,
      indice: notification.indiceHora,
      solicita: 'cancelar',
    };
    Swal.fire({
      title: 'Cancelar turno',
      text: '¿Desea cancelar el turno?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.agendaService
          .solicitarTurno(notification.idHorario, updateSchedule)
          .subscribe((resp) => {
            this.deleteNotification(notification);
          });
      }
    });
  }

  deleteNotification(notification: any, message?: string) {
    this.notificationService
      .updateNotification(notification._id, {
        activo: false,
      })
      .subscribe((resp) => {
        Swal.fire(
          'Excelente',
          message ? message : 'Se ha cancelado el turno',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.getNotifications();
            console.log('paso');
          }
        });
      });
  }
}
