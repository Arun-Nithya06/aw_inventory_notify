import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import express from 'express';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
}
