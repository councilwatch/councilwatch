import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  /**
   * TODO: Should send an email via Postmark, mocked for now
   * @deprecated
   */
  async sendRegistrationEmail(_email: string, token: string): Promise<string> {
    const url = `http://localhost:8080/complete-registration?token=${token}`;

    this.logger.debug(url);

    return url;
  }

  /**
   * TODO: Should send an email via Postmark, mocked for now
   * @deprecated
   */
  async sendLoginEmail(_email: string, token: string): Promise<string> {
    const url = `http://localhost:8080?token=${token}`;

    this.logger.debug(url);

    return url;
  }
}
