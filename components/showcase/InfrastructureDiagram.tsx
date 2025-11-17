'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import styles from './InfrastructureDiagram.module.css'

interface NodeInfo {
  title: string
  content: string
}

const nodeInfo: Record<string, NodeInfo> = {
  server: {
    title: 'Server Hardware',
    content:
      'Raspberry Pi connected to home internet. Running Ubuntu operating system, self-configured and optimized for the setup. The server provides the foundational infrastructure for hosting containerized applications.',
  },
  domain: {
    title: 'Domain & DNS',
    content:
      'Free domain from No-IP with automatic IP update functionality. Seamlessly updates when home internet IP address changes, ensuring the domain always points to the correct server location.',
  },
  ssl: {
    title: 'SSL Certificate',
    content:
      "Let's Encrypt provides free SSL/TLS certificates, enabling secure HTTPS connections for all services. Certificates are automatically renewed before expiration.",
  },
  k8s: {
    title: 'Kubernetes',
    content:
      'K3s lightweight Kubernetes distribution running on Raspberry Pi, providing container orchestration capabilities. Optimized for edge devices and resource-constrained environments.',
  },
  cicd: {
    title: 'CI/CD Pipeline',
    content:
      'GitHub Actions automatically triggers deployment when code is merged into the main branch. Builds, tests, and prepares applications for deployment.',
  },
  deploy: {
    title: 'ArgoCD Deployment',
    content:
      'ArgoCD handles GitOps-based continuous deployment, managing application lifecycle automatically. Monitors Git repositories and ensures the cluster state matches the desired configuration.',
  },
}

export function InfrastructureDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const infoPanelRef = useRef<HTMLDivElement>(null)
  const infoTitleRef = useRef<HTMLHeadingElement>(null)
  const infoContentRef = useRef<HTMLParagraphElement>(null)

  const drawConnections = () => {
    if (!svgRef.current || !diagramRef.current) {
      return
    }

    const svg = svgRef.current
    const container = diagramRef.current

    // Get container dimensions
    const containerRect = container.getBoundingClientRect()
    
    // Set SVG dimensions to match container's actual rendered size
    // getBoundingClientRect() already accounts for CSS transforms
    svg.setAttribute('width', containerRect.width.toString())
    svg.setAttribute('height', containerRect.height.toString())
    svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`)

    // Clear existing connections
    svg.innerHTML = ''

    // Get node positions - use data attributes (CSS modules hash class names)
    const nodes: Record<string, HTMLElement | null> = {
      server: container.querySelector('[data-node="server"]') as HTMLElement,
      domain: container.querySelector('[data-node="domain"]') as HTMLElement,
      ssl: container.querySelector('[data-node="ssl"]') as HTMLElement,
      k8s: container.querySelector('[data-node="k8s"]') as HTMLElement,
      cicd: container.querySelector('[data-node="cicd"]') as HTMLElement,
      deploy: container.querySelector('[data-node="deploy"]') as HTMLElement,
    }

    // Connection paths
    const connections = [
      { from: 'server', to: 'ssl' },
      { from: 'domain', to: 'ssl' },
      { from: 'ssl', to: 'k8s' },
      { from: 'ssl', to: 'cicd' },
      { from: 'k8s', to: 'deploy' },
      { from: 'cicd', to: 'deploy' },
    ]

    connections.forEach((conn) => {
      const fromNode = nodes[conn.from]
      const toNode = nodes[conn.to]

      if (!fromNode || !toNode) {
        return
      }

      const fromRect = fromNode.getBoundingClientRect()
      const toRect = toNode.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Calculate positions relative to container
      // getBoundingClientRect() already accounts for CSS transforms (scale)
      // So we can use the coordinates directly
      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top
      const toX = toRect.left + toRect.width / 2 - containerRect.left
      const toY = toRect.top + toRect.height / 2 - containerRect.top

      // Create curved path
      const midX = (fromX + toX) / 2
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const d = `M ${fromX} ${fromY} Q ${midX} ${fromY} ${midX} ${(fromY + toY) / 2} T ${toX} ${toY}`
      
      // Get stroke color from CSS variable
      const root = document.documentElement
      const primaryColor = getComputedStyle(root).getPropertyValue('--primary').trim() || '59 130 246'
      const strokeColor = `rgb(${primaryColor})`
      
      // Set all attributes - this is what makes the lines visible
      path.setAttribute('d', d)
      path.setAttribute('class', 'connection-line')
      path.setAttribute('data-from', conn.from)
      path.setAttribute('data-to', conn.to)
      path.setAttribute('stroke', strokeColor)
      path.setAttribute('stroke-width', '3')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke-dasharray', '5,5')
      path.setAttribute('opacity', '0.8')
      
      // Also set via style for maximum browser compatibility
      path.style.stroke = strokeColor
      path.style.strokeWidth = '3px'
      path.style.fill = 'none'
      path.style.strokeDasharray = '5,5'
      path.style.opacity = '0.8'
      
      svg.appendChild(path)
    })
  }

  const handleNodeClick = (infoType: string) => {
    const info = nodeInfo[infoType]
    if (!info || !infoTitleRef.current || !infoContentRef.current || !infoPanelRef.current) return

    infoTitleRef.current.textContent = info.title
    infoContentRef.current.textContent = info.content
    infoPanelRef.current.classList.add('active')

    // Highlight connections
    if (svgRef.current) {
      const root = document.documentElement
      const accentColor = getComputedStyle(root).getPropertyValue('--accent').trim() || '16 185 129'
      const primaryColor = getComputedStyle(root).getPropertyValue('--primary').trim() || '59 130 246'
      svgRef.current.querySelectorAll('.connection-line').forEach((line) => {
        const path = line as SVGPathElement
        const from = path.getAttribute('data-from')
        const to = path.getAttribute('data-to')
        if (from === infoType || to === infoType) {
          path.style.opacity = '1'
          path.style.strokeWidth = '4'
          path.style.stroke = `rgb(${accentColor})`
        } else {
          path.style.opacity = '0.6'
          path.style.strokeWidth = '3'
          path.style.stroke = `rgb(${primaryColor})`
        }
      })
    }
  }

  const closeInfoPanel = () => {
    if (!infoPanelRef.current) return
    infoPanelRef.current.classList.remove('active')
    if (svgRef.current) {
      const root = document.documentElement
      const primaryColor = getComputedStyle(root).getPropertyValue('--primary').trim() || '59 130 246'
      svgRef.current.querySelectorAll('.connection-line').forEach((line) => {
        const path = line as SVGPathElement
        path.setAttribute('opacity', '0.8')
        path.setAttribute('stroke-width', '3')
        path.setAttribute('stroke-dasharray', '5,5')
        path.setAttribute('stroke', `rgb(${primaryColor})`)
        path.style.opacity = '0.8'
        path.style.strokeWidth = '3'
        path.style.strokeDasharray = '5,5'
        path.style.stroke = `rgb(${primaryColor})`
      })
    }
  }

  useLayoutEffect(() => {
    // Initialize connections - useLayoutEffect ensures DOM is ready
    const timer = setTimeout(() => {
      drawConnections()
    }, 100)

    // Update connections on resize
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        drawConnections()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Close panel on outside click
    const handleClick = (e: MouseEvent) => {
      if (
        infoPanelRef.current?.classList.contains('active') &&
        !infoPanelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('.node')
      ) {
        closeInfoPanel()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    // Redraw on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => {
          drawConnections()
        }, 100)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Infrastructure Architecture Diagram</h1>
        <p>Interactive visualization of server infrastructure components</p>
      </div>

      <div className={styles.diagramContainer} ref={diagramRef} id="diagram">
        {/* Legend */}
       

        {/* SVG for Connections */}
        <svg className={styles.connections} ref={svgRef} id="connections"></svg>

        {/* Server Hardware Node */}
        <div className={`${styles.node} ${styles.nodeServer}`} data-node="server" onClick={() => handleNodeClick('server')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>🖥️</div>
            <div className={styles.nodeTitle}>Server Hardware</div>
            <div className={styles.nodeDescription}>
              Raspberry Pi
              <br />
              Ubuntu OS
            </div>
            <div className={styles.nodeBadge}>Self-configured</div>
          </div>
        </div>

        {/* Domain & DNS Node */}
        <div className={`${styles.node} ${styles.nodeDomain}`} data-node="domain" onClick={() => handleNodeClick('domain')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>🌐</div>
            <div className={styles.nodeTitle}>Domain & DNS</div>
            <div className={styles.nodeDescription}>
              No-IP Free Domain
              <br />
              Auto IP Update
            </div>
            <div className={styles.nodeBadge}>Dynamic DNS</div>
          </div>
        </div>

        {/* SSL Certificate Node */}
        <div className={`${styles.node} ${styles.nodeSsl}`} data-node="ssl" onClick={() => handleNodeClick('ssl')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>🔒</div>
            <div className={styles.nodeTitle}>SSL Certificate</div>
            <div className={styles.nodeDescription}>
              Let&apos;s Encrypt
              <br />
              Free HTTPS
            </div>
            <div className={styles.nodeBadge}>Auto-renewal</div>
          </div>
        </div>

        {/* Kubernetes Node */}
        <div className={`${styles.node} ${styles.nodeK8s}`} data-node="k8s" onClick={() => handleNodeClick('k8s')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>☸️</div>
            <div className={styles.nodeTitle}>Kubernetes</div>
            <div className={styles.nodeDescription}>
              K3s Distribution
              <br />
              Container Platform
            </div>
            <div className={styles.nodeBadge}>Lightweight</div>
          </div>
        </div>

        {/* CI/CD Node */}
        <div className={`${styles.node} ${styles.nodeCicd}`} data-node="cicd" onClick={() => handleNodeClick('cicd')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>⚙️</div>
            <div className={styles.nodeTitle}>CI/CD Pipeline</div>
            <div className={styles.nodeDescription}>
              GitHub Actions
              <br />
              Auto Deploy
            </div>
            <div className={styles.nodeBadge}>Trigger: main</div>
          </div>
        </div>

        {/* Deployment Node */}
        <div className={`${styles.node} ${styles.nodeDeploy}`} data-node="deploy" onClick={() => handleNodeClick('deploy')}>
          <div className={styles.nodeCard}>
            <div className={styles.nodeIcon}>🚀</div>
            <div className={styles.nodeTitle}>Deployment</div>
            <div className={styles.nodeDescription}>
              ArgoCD GitOps
              <br />
              Continuous Deployment
            </div>
            <div className={styles.nodeBadge}>Automated</div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className={styles.infoPanel} ref={infoPanelRef} id="infoPanel">
        <button className={styles.close} onClick={closeInfoPanel}>
          ×
        </button>
        <h3 ref={infoTitleRef}></h3>
        <p ref={infoContentRef}></p>
      </div>
    </div>
  )
}

