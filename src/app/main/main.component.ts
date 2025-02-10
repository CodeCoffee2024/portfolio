import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnInit {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  contactForm!: FormGroup;
  isSubmitted = false;
  icons = [
    'bi-cup-hot', 'bi-cup-hot-fill', 'bi-bug', 'bi-bug-fill', 'bi-mortarboard',
    'bi-code-slash', 'bi-code', 'bi-alarm', 'bi-braces-asterisk', 'bi-cart3', 'bi-cloud', 'bi-chat-text'
  ];
  floatingIcons: { icon: string, style: { [key: string]: string } }[] = [];
  companies = [
    {
      name: 'Company 5',
      from: 'December 2023',
      position: 'Software Engineer',
      to: 'Current',
      job: 'Develop and maintain web applications using ASP.NET, ensuring high performance, security, and scalability. Handle support tickets by troubleshooting and resolving system issues, providing timely and effective solutions. Collaborate with cross-functional teams in an Agile environment, participating in sprints to enhance system features and optimize workflows.',
      contributions: [
        'Implemented security features to prevent cross-site scripting (XSS) and cross-site request forgery (CSRF), enhancing application protection against malicious attacks.',
        'Integrated rate limiting to prevent abuse and ensure fair API usage, improving system stability and performance.',
        'Enforced session timeout policies to enhance security by automatically logging out inactive users, reducing the risk of unauthorized access.',
        'Optimized multiple database queries to improve report generation performance, reducing execution time and enhancing data retrieval efficiency.',
        'Implemented a detailed tax breakdown feature, extracting and displaying tax components from database tables for improved transparency.'
      ],
      stack: ['ASP.NET', '.NET Core', 'Angular', 'Azure', 'REST APIs', 'Bit bucket']
    },
    {
      name: 'Company 4',
      from: 'September 2022',
      position: 'Web Developer',
      to: 'December 2023',
      job: 'Manage and develop multiple ERP projects, internal system optimization, and web-based solutions. Handle support tickets, troubleshoot software issues, and implement solutions to improve operational workflows. Collaborate with cross-functional teams to enhance system functionality and align technology with business goals.',
      contributions: [
        'Developed a warehouse inventory allocation module to optimize stock distribution and tracking.',
        'Enhanced the user interface across multiple screen sizes, ensuring a seamless and responsive experience. ',
        'Implemented a PDF report export feature across different tables, enabling users to generate structured, print-ready reports directly from the system. '
      ],
      stack: ['Symfony', 'MySQL', 'Angular', 'Apache', 'Linux', 'REST APIs', 'Bit bucket']
    },
    {
      name: 'Company 3',
      from: 'Nov 2021',
      position: 'Software Engineer II',
      to: 'Sept 2022',
      job: 'Designed, developed, and maintained e-commerce projects using Agile methodology, ensuring seamless functionality, scalability, and user experience.',
      contributions: [
        'Developed calculation of shipping fee per merchant',
        'Setup the environment of new projects',
        'Developed an API bridge from Meta to system to track user behavior'
      ],
      stack: ['CodeIgniter 3', 'MySQL', 'XAMPP', 'REST APIs', 'Source Tree']
    },
    {
      name: 'Company 2',
      from: 'May 2020',
      position: 'Jr. Software Developer/ Jr. Data Quality Assurance',
      to: 'Nov 2021',
      job: 'Developed web applications for multiple departments and collaborated on design strategies and sales report automation.',
      contributions: [
        'Created HR Recruitment website for HR department',
        'Developed a Sales Information web app for Sales Department live sales information and hierarchy',
        'Generate month to date sales report',
        'Facilitate MS Excel training for company staff'
      ],
      stack: ['CodeIgniter 3', 'MySQL', 'XAMPP']

    },

    {
      name: 'Company 1',
      from: 'Aug 2019',
      position: 'Jr. Systems Developer',
      to: 'Mar 2020',
      job: 'Led the development of an automated accounting system to streamline internal processes, handled basic network and hardware troubleshooting, and maintained the company website and portfolio.',
      contributions: [
        'Developed accounting system',
        'Create and maintain company portfolio',
        'Troubleshoot network and hardware concerns'
      ],
      stack: ['WPF.NET']
    }
  ]
  projects = [
    {
      title1: "Capstone Title",
      title2: "Generator",
      image: '/assets/capstone.png',
      description: "This project aims to help students who struggle to come up with capstone title in the subject matter using AI as a tool in creating suggestion."
    },
    {
      title1: "Admin",
      title2: "Dashboard",
      image: '/assets/admin-dashboard.png',
      description: "This project aims to showcase different UI approach combined with different tools used in UI as well as combination of colors and UX."
    },
    {
      title1: "Weather",
      title2: "Dashboard",
      image: '/assets/weather-dashboard.png',
      description: "This project showcases my skills in UI design, sprite images, and data visualization using weather API making it an excellent addition to my developer's portfolio."
    }
  ]
  images = [
    '/assets/angular.png',
    '/assets/csharp.png',
    '/assets/dotnet.png',
    '/assets/typescript.png',
    '/assets/javascript.png',
    '/assets/bootstrap.png',
    '/assets/codeigniter.png',
    '/assets/laravel.png',
    '/assets/git.png',
    '/assets/php.png',
    '/assets/mysql.png'
  ];
  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    this.generateFloatingIcons(10); // Generate 10 floating icons
  }
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert('Your message has been sent!');
      this.contactForm.reset();
      this.isSubmitted = false;
    }
  }
  ngAfterViewInit(): void {
    this.startScrolling();
  }
  getTools(tools: string[]) {
    return tools.join(', ');
  }
  generateFloatingIcons(count: number): void {
    for (let i = 0; i < count; i++) {
      const icon = this.icons[Math.floor(Math.random() * this.icons.length)];
      const { animation, style } = this.generateRandomAnimation();
      this.floatingIcons.push({ icon, style });

      // Dynamically inject the animation into the DOM
      const styleElement = this.renderer.createElement('style');
      styleElement.innerHTML = animation;
      this.renderer.appendChild(document.head, styleElement);
    }
  }
  generateRandomAnimation(): { animation: string, style: { [key: string]: string } } {
    const duration = (Math.random() * 20 + 10).toFixed(2); // Random duration between 10s and 30s
    const startX = Math.random() * 100; // Random starting X position (0% to 100%)
    const startY = Math.random() * 100; // Random starting Y position (0% to 100%)
    const endX = Math.random() * 100; // Random ending X position (0% to 100%)
    const endY = Math.random() * 100; // Random ending Y position (0% to 100%)

    const animationName = `float-${Math.random().toString(36).substring(7)}`;
    const animation = `
      @keyframes ${animationName} {
        0% { transform: translate(${startX}vw, ${startY}vh); }
        50% { transform: translate(${endX}vw, ${endY}vh); }
        100% { transform: translate(${startX}vw, ${startY}vh); }
      }
    `;

    const style = { animation: `${animationName} ${duration}s linear infinite` };

    return { animation, style };
  }
  startScrolling() {
    const container = this.imageContainer.nativeElement;

    setInterval(() => {
      const firstImage = container.children[0];

      // Move container left smoothly
      container.style.transition = 'transform 1s linear';
      container.style.transform = `translateX(-${firstImage.clientWidth + 20}px)`;

      setTimeout(() => {
        // Move the first image to the end
        container.appendChild(firstImage);

        // Reset container position instantly (without transition)
        container.style.transition = 'none';
        container.style.transform = 'translateX(0)';
      }, 1000); // Match the transition duration
    }, 2000); // Time interval before moving the next image
  }
  get yearsFrom2019(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - 2019;
  }
}
