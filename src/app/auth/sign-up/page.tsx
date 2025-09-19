import { redirect } from 'next/navigation';

export default function SignUpPage() {
  // Redirect to application page since users must apply first
  redirect('/apply');
}