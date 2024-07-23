import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  value: string | undefined;
  data: any;
  options: any;
  stateOptions: any[] = [{ label: 'Grafica', value: 'Tabla' }, { label: 'Return', value: 'return' }];
  valueSelectButton: string = 'on';
  kmRecorridos: number | undefined;
  fecha: string | undefined;
  comentario: string | undefined;

  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        "01/06", "02/06", "03/06", "04/06", "05/06",
        "06/06", "07/06", "08/06", "09/06", "10/06",
        "11/06", "12/06", "13/06", "14/06", "15/06"
      ],
      datasets: [
        {
          label: "Jesús Garcia",
          data: [20, 35, 22, 19, 38, 30, 25, 27, 34, 21, 23, 29, 32, 28, 24],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: file.name });
    }
  }

  agregarMarca() {
    if (!this.fecha || !this.kmRecorridos) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fecha y KM recorridos son obligatorios' });
      return;
    }

    // Agregar nueva fecha si no existe
    if (!this.data.labels.includes(this.fecha)) {
      this.data.labels.push(this.fecha);
    }

    // Buscar índice de la fecha en las etiquetas
    const index = this.data.labels.indexOf(this.fecha);

    // Si existe un valor en esa fecha, actualizarlo, si no, agregarlo
    if (this.data.datasets[0].data[index] !== undefined) {
      this.data.datasets[0].data[index] = this.kmRecorridos;
    } else {
      // Rellenar datos faltantes con null
      for (let i = this.data.datasets[0].data.length; i < index; i++) {
        this.data.datasets[0].data[i] = null;
      }
      this.data.datasets[0].data[index] = this.kmRecorridos;
    }

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos actualizados' });

    // Marcar los cambios para detectar
    this.cdr.detectChanges();
    console.log('No actualiza la tabla porque no puedo recasrgar la pagina, se actualizara cuando lo conecte en la base de datos');
    console.log('Datos actualizados:', this.data);
  }
}