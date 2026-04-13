import { Link } from '@inertiajs/react';
import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
      <Link href='/'>
        <img src="/images/logo.png" alt="hikay" className='w-25' />
        </Link>
    );
}
