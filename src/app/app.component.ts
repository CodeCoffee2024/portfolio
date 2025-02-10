import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  icons = [
    'bi-cup-hot', 'bi-cup-hot-fill', 'bi-bug', 'bi-bug-fill', 'bi-mortarboard',
    'bi-code-slash', 'bi-code', 'bi-alarm', 'bi-braces-asterisk', 'bi-cart3', 'bi-cloud', 'bi-chat-text'
  ];
  techStacks = [
    'angular',
    'dotnet',
    'typescript',
    'javascript',
    'bootstrap',
    'csharp',
    'codeigniter',
    'laravel',
    'git',
    'mysql',
    'php'
  ];

  floatingIcons: { icon: string, style: { [key: string]: string } }[] = [];

  constructor(private renderer: Renderer2) {
    this.generateFloatingIcons(10); // Generate 10 floating icons
  }
  projectStacks = [
    {
      title: 'capstone',
      tools: [
        'angular',
        'gemini',
        'bootstrap',
        'html',
        'css',
        'typescript'
      ]
    },
    {
      title: 'admin-dashboard',
      tools: [
        'angular',
        'bootstrap',
        'html',
        'css',
        'typescript'
      ]
    },
    {
      title: 'weather-dashboard',
      tools: [
        'angular',
        'bootstrap',
        'html',
        'css',
        'typescript'
      ]
    }
  ]
  projectStack(project: string) {
    console.log(this.projectStacks.filter(it => it.title == project).map(it => it.tools));
    return this.projectStacks.filter(it => it.title == project).map(it => it.tools)[0];
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
}
