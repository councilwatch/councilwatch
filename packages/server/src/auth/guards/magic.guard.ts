import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MAGIC } from '../auth.constants';

@Injectable()
export class MagicAuthGuard extends AuthGuard(MAGIC) {}
