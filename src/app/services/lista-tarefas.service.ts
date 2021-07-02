import { Injectable } from '@angular/core';
import { TarefaModel } from './tarefa-model';

@Injectable({
  providedIn: 'root'
})
export class ListaTarefasService {
  public lista: Array<TarefaModel> = [];
  private proximoId = 1; // controle interno de ID
  public contadorTarefasPendentes = 0;

  // quantidadePendente() {
  //   return this.lista.filter(x => !x.concluida).length;
  // } outra forma de fazer o contador, através de uma

  constructor() { }

  public adicionar(descricao: string): void {
    const nova = new TarefaModel(); // criar nova tarefa
    nova.id = this.proximoId;
    nova.descricao = descricao;
    this.lista.push(nova);
    // atualizar outras variaveis
    this.proximoId++; // Atualiza o ID para o próximo
    this.atualizarContador();
  }

  public atualizarContador(): void {
    this.contadorTarefasPendentes = this.lista.filter((x) => !x.concluida).length;
  }

  public atualizar(tarefaid: number): void {
    const tarefaEncontrada = this.lista.find((x) => x.id === tarefaid);
    if (tarefaEncontrada) {
      tarefaEncontrada.concluida = !tarefaEncontrada.concluida; // Atualizar status
    }
    this.atualizarContador();
  }

  public limpar(): void {
    const continuar = confirm("Você tem certeza que quer continuar?")
      if (continuar) {
      //this.length = 0;
      this.lista = [];
      this.contadorTarefasPendentes = 0;
    }
  }
}
