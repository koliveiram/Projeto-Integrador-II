import { Agendamento } from 'src/app/interfaces/agendamento';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent {
  idAvaliacao = 0;
  idAgendamento = 0;
  idDiarista = 0;

  diarista = '';


  constructor(
    private modalRef: BsModalRef,
    private formBuilder: NonNullableFormBuilder,
    private agendamentoService: AgendamentoService
  ){

  }
  ngOnInit(): void {
    const id = this.idAvaliacao;
    if(id != 0){
      this.agendamentoService.buscarAgendamentoPorId(id).subscribe((agendamento: Agendamento) => {
        this.avaliacao.setValue({
          estrelas: agendamento.estrelas,
          comentario: agendamento.comentario
        })
      })
    }
  }

  avaliacao = this.formBuilder.group({
    estrelas: [0, Validators.required],
    comentario: ['', Validators.required]
  })

  registrar(){
    const avaliacao = this.avaliacao.value as Agendamento;
    avaliacao.id = this.idAgendamento;
    const idDiarista = this.idDiarista;
    this.agendamentoService.avaliarDiarista(idDiarista, avaliacao).subscribe((agendamento: Agendamento) => {
      this.fecharModal();
    })
    // console.log(avaliacao)



  }

  fecharModal() {

    this.modalRef.hide();
    window.location.href = `http://localhost:4200/feedbacks`;
  }

}
