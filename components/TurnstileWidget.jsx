import { Turnstile } from '@marsidev/react-turnstile';

const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

const TurnstileWidget = ({ onVerify, onExpire }) => {
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === 'development' ? TURNSTILE_TEST_SITE_KEY : '');

  if (!siteKey) {
    return (
      <div className="mt-6 text-sm text-muted-foreground" data-testid="turnstile-widget">
        Verificación no configurada. Configure NEXT_PUBLIC_TURNSTILE_SITE_KEY.
      </div>
    );
  }

  return (
    <div className="mt-6" data-testid="turnstile-widget">
      <Turnstile
        siteKey={siteKey}
        onSuccess={(token) => {
          if (onVerify) onVerify(token);
        }}
        onError={() => {
          console.error('Turnstile error');
        }}
        onExpire={() => {
          if (onExpire) onExpire();
        }}
        options={{
          theme: 'light',
          action: 'form_submit',
        }}
      />
    </div>
  );
};

export default TurnstileWidget;
