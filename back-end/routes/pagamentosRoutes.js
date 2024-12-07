import express from 'express';
import { listPagamentosByEmpresa, listPagamentosNull, updatePagamento, deletePagamento } from '../controllers/PagamentoController.js'

const router = express.Router();

router.get('/relatorio/pagamentos', listPagamentosByEmpresa);

router.get('/relatorio/pagamentosAbertos', listPagamentosNull);

router.put('/update/pagamentos/:id', updatePagamento);

router.delete('/pagamentos/:id', deletePagamento);

export default router;
